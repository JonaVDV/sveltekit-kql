# sveltekit-kql

## 0.1.1

### Patch Changes

- 3b59fed: Fix a problem where the image default props are not normal properties but functions instead
  Fix: make sure to export the KQLQueryTypeResolver type

## 0.1.0

### Minor Changes

- eb38111: Unify logic for fetching with queries to single handler. this makes us able to use load functions in a more natural way and giving the user all the power
