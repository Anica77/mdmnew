import supabase from "./components/Supabase";

function generateUUID() {
  // Implementation of UUID generation
  // This is a simple example, you might want to use a more robust library for UUID generation in a production environment
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function setCookie(name, value, minutes) {
  var expires = "";
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000); // Convert minutes to milliseconds
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function setUniqueCookie(name, days) {
  const uuid = generateUUID(); // Generate a unique identifier
  setCookie(name, uuid, days); // Set the unique identifier in the cookie
}

export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}
async function deleteRowsOneMinuteAgo() {
  try {
    // Calculate the timestamp representing one minute ago
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();

    // Execute the delete operation
    const { error } = await supabase
      .from("your_table_name")
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

// Schedule periodic execution
setInterval(deleteRowsOneMinuteAgo, 60 * 1000);
