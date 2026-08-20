import Providers from "@/app/Providers";
import { Layout } from "@/app/Layout";
import Home from "@/pages/Home";

function App() {
  return (
    <Providers>
      <Layout>
        <Home />
      </Layout>
    </Providers>
  );
}

export default App;
