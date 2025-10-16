export function getGroups(): string[] {
  const groups = JSON.parse(localStorage.getItem("projectGroups") || "[]");
  return groups;
}

export function saveGroups(newGroups: string[]): string[] {
  const existingGroups = getGroups();
  const mergedGroups = Array.from(new Set([...existingGroups, ...newGroups]));
  mergedGroups.sort((a, b) => a.localeCompare(b));
  localStorage.setItem("projectGroups", JSON.stringify(mergedGroups));

  return mergedGroups;
}

export function deleteGroup(group: string) {
  const existingGroups = getGroups();
  const updatedGroups = existingGroups.filter((g) => g !== group);
  localStorage.setItem("projectGroups", JSON.stringify(updatedGroups));

  return updatedGroups;
}
