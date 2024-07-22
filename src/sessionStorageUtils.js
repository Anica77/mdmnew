import supabase from "./components/Supabase";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function setSessionStorageItem(name, value) {
  sessionStorage.setItem(name, value);
}

export function getSessionStorageItem(name) {
  return sessionStorage.getItem(name);
}

export function setUniqueSessionStorageItem(name) {
  const uuid = generateUUID(); // Generate a unique identifier
  setSessionStorageItem(name, uuid); // Set the unique identifier in session storage
}

async function deleteRowsOneMinuteAgo() {
  try {
    // Calculate the timestamp representing one minute ago
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();

    // Execute the delete operation
    const { error } = await supabase
      .from("cart")
      .delete()
      .lt("created_at", oneMinuteAgo); // Delete rows created before one minute ago

    if (error) {
      console.error("Error deleting rows:", error.message);
    } else {
      console.log("Rows deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting rows:", error.message);
  }
}

setInterval(deleteRowsOneMinuteAgo, 30 * 60 * 1000);
