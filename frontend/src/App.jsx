import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'

function App() {
  // WHY: Add the shared storefront chrome without creating a page or product content.
  return (
    <>
      <Header />
      <main className="layout-main" />
      <Footer />
    </>
  )
}

export default App
