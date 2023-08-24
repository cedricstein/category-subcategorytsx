import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";

import { makeStyles } from "@mui/styles";
import {
  CategoriesContext,
  CategoriesProvider,
  useCategoriesContext,
} from "./CategoriesProvider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationIcon from "@mui/icons-material/LocationOn";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const Sidebar = () => {
  const classes = useStyles();
  const { categories } = useCategoriesContext();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <List>
        {categories.map(({ id, label, icon }) => {
          return (
            <Accordion key={id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <ListItemIcon>{icon}</ListItemIcon>
                <Typography>{label}</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <AccordionDetails>
                  <Typography>*Sous-categorie*</Typography>
                </AccordionDetails>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </List>
    </Drawer>
  );
};

const MainContent = () => {
  const { categories, setCategories } = useCategoriesContext();
  const [newCategoryLabel, setNewCategoryLabel] = React.useState("");

  const addCategory = () => {
    const newCategory = {
      id: categories.length + 1,
      label: newCategoryLabel, // Use the dynamic label here
      icon: <LocationIcon />,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryLabel(""); // Clear the input field after adding a category
  };

  // const addSubCategory = () => {
  //   const newSubCategory = {
  //     id: subCategories.length + 1,
  //     label: newSubCategoryLabel, // Use the dynamic label here
  //     icon: <LocationIcon />,
  //   };

  //   setSubCategories([...subCategories, newSubCategory]);
  //   setNewSubCategoryLabel(""); // Clear the input field after adding a category
  // };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  }; 

  return (
    <Box flex={1} color={"primary"}>
      <Container>
        <Box px={4} py={4} width="100%">
          <Box pb={2}>
            <Typography variant="h4">Categories</Typography>
          </Box>
          {categories.map(({ id, label, icon }) => {
            // return an accordion
            return (
              <Accordion key={id}>
         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <ListItemIcon>{icon}</ListItemIcon>
          <Typography>{label}</Typography>
          <Box ml="auto"><Button >Add Subcategory</Button>
    <IconButton onClick={() => deleteCategory(id)} style={{ marginLeft: '-8px' }}>
      <DeleteOutline />
    </IconButton>
    </Box>
    </AccordionSummary>

                <AccordionDetails>
                  <Typography>*Sous-categorie*</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
          {/* add a button for adding a category */}
         <Box pt={2} style={{ marginLeft: '600px' }}>
      <TextField
        label="New Category Label"
        value={newCategoryLabel}
        onChange={(e) => setNewCategoryLabel(e.target.value)}
        variant="outlined"
      
      />
      <Button variant="contained" color="primary" onClick={addCategory} style={{ height: '56px' }}>
        Add Category
      </Button>
    </Box>
        </Box>
      </Container>
    </Box>
  );
};

// const SomeOtherComponent = () => {
//   const { categories } = useCategoriesContext();
//   console.log("hi");
//   return <div>Hello!</div>;
// };

export default function App() {
  const classes = useStyles();

  return (
    <CategoriesProvider>
      <Box display="flex">
        <CssBaseline />
        <Sidebar />
        <MainContent />
      </Box>
    </CategoriesProvider>
  );
}