import React from "react";
import { Container, Box } from "@mui/material";
import ProductCategories from "../../components/Inicio/ProductCategories";
import ProductHero from "../../components/Inicio/ProductHero";
import ProductValues from "../../components/Inicio/ProductValues";
import ProductHowItWorks from "../../components/Inicio/ProductHowItWorks";
import withRoot from "../../components/Inicio/withRoot";

function HomePage() {
  const componentSpacing = {
    marginBottom: 10, // Puedes ajustar el valor según tu preferencia.
  };

  return (
    <Container>
      <Box sx={componentSpacing}>
        <ProductHero />
      </Box>
      <Box sx={componentSpacing}>
        <ProductValues />
      </Box>
      <Box sx={componentSpacing}>
        <ProductCategories />
      </Box>
      <Box sx={componentSpacing}>
        <ProductHowItWorks />
      </Box>
    </Container>
  );
}

export default withRoot(HomePage);
