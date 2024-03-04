import { createBrowserRouter } from "react-router-dom";
import Listagem from "../pages/Listagem";
import PokemonDetails from "../pages/Pokemon";


export const routes = createBrowserRouter([
    {
        path: "/pokemon/:id",
        element: <PokemonDetails />
    },
    {
        path:"/",
        element: <Listagem/>
    }
]);