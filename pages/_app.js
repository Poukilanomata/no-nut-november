import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wrapper } from '../store/store'
import '../styles/globals.scss'


function MyApp({ Component, pageProps }) {
    const client = new QueryClient()
    return (
        <QueryClientProvider client={client}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
}

export default wrapper.withRedux(MyApp)
