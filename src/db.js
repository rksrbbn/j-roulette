import Dexie from "dexie";

export const db = new Dexie("j-roulette");

db.version(1).stores({
  history: "++id, memberName, timestamp"
});

export const addHistory = async (history) => {
  return await db.history.add(history);
};

export const getHistory = async () => {
  return await db.history.toArray();
};

export const clearHistory = async () => {
  return await db.history.clear();
};