import { Container, Box } from "@mui/material";
import { ProductCategories } from "../../components/Inicio/ProductCategories";
import ProductHero from "../../components/Inicio/ProductHero";
import ProductValues from "../../components/Inicio/ProductValues";
import ProductHowItWorks from "../../components/Inicio/ProductHowItWorks";
import { withRoot } from "../../components/Inicio/withRoot";
import { useState } from "react";

function HomePage() {
  const componentSpacing = {
    marginBottom: 10,
  };
  const [rubros, setRubros] = useState([]);

  return (
    <Container>
      <Box sx={componentSpacing}>
        <ProductHero />
      </Box>
      <Box sx={componentSpacing}>
        <ProductValues />
      </Box>
      <Box sx={componentSpacing}>
        <ProductCategories setRubros={setRubros} />
      </Box>
      <Box>
        <ProductHowItWorks />
      </Box>
    </Container>
  );
}

export default withRoot(HomePage);