import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

// difference between export and export default

// export: Allows you to export multiple named exports from a module. When importing, you must use the same names and wrap tehm in curly braces.

// export default: Allows you to export a single default export from a module. When importing, you can use any name and do not need curly braces.

// You can use both export and export default in the same module. However, there can only be one default export.

/* In our AuthContext example, we are using both types:

AuthContext is the default export, meaning it can be imported without curly braces and can be named anything by the importer.

useAuth is a named export, meaning it must be imported with curly braces and must be imported using the exact name "useAuth" */
