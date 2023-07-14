import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  NewsLetter,
  SinglePageError,
} from './pages'
import { loader as landingLoader } from './pages/Landing'
import { loader as cocktailLoader } from './pages/Cocktail'
import { action as newsLetterAction } from './pages/NewsLetter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />, //? error elements will bubble up if no error element specified in children routes
    children: [
      //? look at all pages below to decide which one will be at home page
      //? and add index property to `true`
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient),
        errorElement: <SinglePageError />,
      },
      {
        path: 'cocktail/:id',
        errorElement: <SinglePageError />,
        element: <Cocktail />,
        loader: cocktailLoader(queryClient),
      },
      {
        path: 'newsLetter',
        element: <NewsLetter />,
        action: newsLetterAction,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App
