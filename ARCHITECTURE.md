# Architecture front-end 

## Arborescence des dossiers

```
src/
├── components/
│   └── HeaderComponent.tsx     # Composant réutilisable (titre + indicateurs)
├── hooks/
│   └── useData.ts              # Hook qui centralise l'accès aux données
├── models/
│   ├── Olympic.ts              # Interface TypeScript pour un pays
│   └── Participation.ts        # Interface TypeScript pour une participation aux Jeux Olympiques
├── pages/
│   ├── DashboardPage.tsx       # Page principale — vue globale 
│   └── CountryDetailPage.tsx   # Page détail — statistiques d'un pays
├── router.tsx                  # Configuration des routes React Router
├── App.tsx                     # Composant racine (enregistrement Chart.js + RouterProvider)
├── main.tsx                    # Point d'entrée React
└── index.css                   # Styles globaux
```

---

## Composants et leurs rôles

### Composants "smart" (pages/)

Les composants smart gèrent les données et coordonnent l'affichage. Ils appellent le hook `useData` et le rendu est délégué aux composants dumb.

| Composant | Rôle |
|---|---|
| `DashboardPage.tsx` | Affiche le graphique de type chart pie des médailles par pays, et gère l'état de chargement. |
| `CountryDetailPage.tsx` | Récupère l'ID du pays depuis l'URL (`useParams`), affiche ses statistiques et son graphique de type line |

### Composants "dumb" (components/)

Les composants dumb reçoivent des props et s'occupent uniquement de l'affichage. Ils ne connaissent pas les données  et peuvent être réutilisés dans les pages.

| Composant | Props | Rôle |
|---|---|---|
| `HeaderComponent.tsx` | `title: string`, `indicators: Indicator[]` | Affiche le titre de la page et les cartes d'indicateurs. |

---

## Modèles TypeScript (models/)

Les interfaces TypeScript définissent la forme des données. Elles remplacent les `any` du code de départ.

```ts
// Participation.ts
interface Participation {
  id: number
  year: number
  city: string
  medalsCount: number
  athleteCount: number
}

// Olympic.ts
interface Olympic {
  id: number
  country: string
  participations: Participation[]
}
```

---

## Hook de données (hooks/useData.ts)

`useData` est le point d'accès unique aux données. Il expose les données et l'état de chargement.

```ts
const { data, loading } = useData()
```

**Fonctionnement actuel :** le hook retourne un tableau statique de pays et de médailles. L'état `loading` passe à `false` quand les données sont disponibles, et un spinner est déclenché le temps du chargement.

---

## Routing (router.tsx)

La configuration des routes est déplacée dans un fichier dédié. Cela permet de gérer toute la navigation au même endroit.

| Route | Composant |
|---|---|
| `/` | `DashboardPage` |

---

## Préparation à une future API

L'architecture est conçue pour recevoir une future connexion à un back-end API REST. Actuellement les données sont statiques dans `useData.ts`, et il faudra juste remplacer le tableau par un `fetch` :

```ts
// Actuellement
useEffect(() => {
  setData(olympicsData)
  setLoading(false)
}, [])

// Avec une API
useEffect(() => {
  fetch('/api/olympics')
    .then(res => res.json())
    .then(json => {
      setData(json)
      setLoading(false)
    })
}, [])
```


