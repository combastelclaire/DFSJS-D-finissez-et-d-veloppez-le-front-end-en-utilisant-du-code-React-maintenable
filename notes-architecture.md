# Analyse du code existant — Problèmes identifiés


## Problèmes identifiés

### 1. Fichiers trop volumineux

**Fichier :** `src/App.tsx`  
**Problème :** Le fichier contient 3 composants (`Home`, `Country`, `App`), les données, et le routing. Il dépasse 380 lignes, soit au-delà de la limite recommandée de 300 lignes.  
**Solution envisagée :** 1 fichier par composant — créer `src/pages/DashboardPage.tsx`, `src/pages/CountryDetailPage.tsx`, et garder `src/App.tsx` uniquement pour le composant racine.

---

### 2. Duplication de code

**Fichier :** `src/App.tsx`  
**Problème :** Les cartes d'indicateurs (libellé + valeur) sont dupliquées entre `Home` (l.233–246) et `Country` (l.337–352) avec la même structure HTML/CSS.  
**Solution envisagée :** Extraire en un composant réutilisable `src/components/HeaderComponent.tsx` qui prend un titre et une liste d'indicateurs en props.

---

### 3. Mauvaise gestion des Side Effects (`useEffect` inutile)

**Fichier :** `src/App.tsx`  
**Problème :** Le `useEffect` dans `Home` (l.154–162) simule un appel API avec un `setTimeout`, mais les données sont un tableau statique disponible immédiatement. Ce `useEffect` est donc inutile. De plus, en mode Strict React exécute les effets deux fois en développement, ce qui provoque un double chargement. 
**Solution envisagée :** Supprimer le `useEffect` et initialiser les données directement dans le state. Quand les données viendront d'une API, extraire la logique dans un hook dédié `src/hooks/useData.ts`.

---

### 4. Absence de typage strict (`any`)

**Fichier :** `src/App.tsx`  
**Problème :** `any` est utilisé partout (l.28, 149, 165, 167, 181, 271, 277, 281), ce qui enlève tous les avantages de TypeScript.  
**Solution envisagée :** Créer une classe TypeScript par modèle — `src/models/Participation.ts` et `src/models/Olympic.ts` — et les utiliser partout à la place de `any`.

---

### 5. Code de débogage oublié (`console.log`)

**Fichier :** `src/App.tsx`  
**Problème :** 5 `console.log` sont présents dans le code (l.156, 160, 269, 274, 371), dont certains affichent des données en clair.  
**Solution envisagée :** Supprimer ces console.log.

---

### 6. Gestion des états loading/error insuffisante

**Fichier :** `src/App.tsx`  
**Problème :** l.176 — l'état de chargement est dérivé de la présence des données (`if (!data)`). Il n'existe pas d'état `error` . Si àa échoue il y aura un spinner infini sans message d'erreur.  
**Solution envisagée :** Utiliser des états dédiés `const [loading, setLoading] = useState(true)` et `const [error, setError] = useState(null)` plutôt que de dériver l'état de chargement depuis `!data`.

---

### 7. Composant `Country` inaccessible

**Fichier :** `src/App.tsx`  
**Problème :** l.265 pour `Country`, l.374–378 pour le routing. Le composant est défini mais aucune route ne pointe vers lui. De plus, si l'id passé en URL ne correspond à aucun pays, le composant plantera.  
**Solution envisagée :** Ajouter la route `/country/:id` dans le router, et gérer le cas où l'id ne correspond à aucun pays (redirection ou page d'erreur).

---

### 8. Configuration du routing dans `App.tsx`

**Fichier :** `src/App.tsx`  
**Problème :** l.369 — la configuration des routes est définie directement dans `App.tsx`.  
**Solution envisagée :** Extraire dans un fichier dédié `src/router.tsx`.

---

### 9. Données hardcodées dans le composant

**Fichier :** `src/App.tsx`  
**Problème :** l.28 — le tableau `olympicsData` est déclaré directement dans le fichier App.tsx. Dans un vrai projet, ces données viendraient d'une API.  
**Solution envisagée :** Déplacer dans `src/data/olympics.ts` et exposer via le hook `useData`, pour préparer le terrain à un vrai appel API.

---

### 10. Logique métier dans les composants

**Fichier :** `src/App.tsx`  
**Problème :** l.165–170 et l.276–284 — les calculs (`calculateTotalMedals`, `totalAthletes`...) sont dans les composants, mélangeant logique métier et affichage.  
**Solution envisagée :** Appliquer la Loi de Déméter (LOD). Modéliser chaque pays comme un objet responsable de ses propres calculs. La classe `Olympic` dans `src/models/Olympic.ts` encapsule toute la logique métier liée à un pays :

```ts
class Olympic {
  id: number
  country: string
  participations: Participation[]

  getTotalMedals(): number {
    return this.participations.reduce((sum, p) => sum + p.medalsCount, 0)
  }

  getTotalAthletes(): number {
    return this.participations.reduce((sum, p) => sum + p.athleteCount, 0)
  }

  getTotalParticipations(): number {
    return this.participations.length
  }
}
```
---

## Priorisation par impact

| Priorité | Problèmes | Justification |
|---|---|---|
| Haute | 4 (`any`), 6 (loading/error), 7 (composant inaccessible) | Bugs potentiels en production, fonctionnalité manquante |
| Moyenne | 1 (fichier volumineux), 3 (useEffect), 8 (routing), 9 (données hardcodées), 10 (logique métier) | Dette technique |
| Basse | 2 (duplication), 5 (console.log) | Qualité du code et lisibilité |

