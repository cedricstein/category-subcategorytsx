import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  Toolbar,
  AppBar,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationIcon from "@mui/icons-material/LocationOn";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import AlarmIcon from "@mui/icons-material/Alarm";
type Category = {
  id: number;
  label: string;
  icon: React.ReactNode;
  subcategories: Subcategory[];
};

type Subcategory = {
  id: number;
  label: string;
};

const drawerWidth = 240;
const drawerTopHeight = 240;
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

  drawerTop: {
    height: drawerTopHeight,
    flexShrink: 0,
  },
  drawerTopPaper: {
    height: drawerTopHeight,
  },
  
}));


const Header = () => {
  const classes = useStyles();


  return (
    <Drawer
      className={classes.drawerTop}
      variant="permanent"
      classes={{
        paper: classes.drawerTopPaper,
      }}
      anchor="top"
    >
         <Box pb={2}>
            <Typography variant="h4">Categories</Typography>
          </Box>
    </Drawer>
  );
};

const Sidebar = () => {
  const classes = useStyles();
  const { categories } = useCategoriesContext();
  const [newCategoryLabel, setNewCategoryLabel] = React.useState("");
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null);

  const addSubcategory = (categoryId: number) => {
    // ... Rest of the code for adding subcategories
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <List >
        {categories.map((category) => (
          <Accordion key={category.id} >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemIcon >{category.icon}</ListItemIcon >
              <Typography>{category.label}</Typography>
           
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {category.subcategories.map((subcategory) => (
                  <Typography key={subcategory.id}>{subcategory.label}</Typography>
                ))}
                {selectedCategoryId === category.id && (
                  <div>
                    <TextField
                      label="New Subcategory Label"
                      value={newCategoryLabel}
                      onChange={(e) => setNewCategoryLabel(e.target.value)}
                      variant="outlined"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addSubcategory(category.id)}
                    >
                      Add Subcategory
                    </Button>
                  </div>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Drawer>
  );
};

const MainContent = () => {
  const { categories, setCategories } = useCategoriesContext();
  const [newCategoryLabel, setNewCategoryLabel] = React.useState("");
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null);

  const deleteCategory = (categoryId: number) => {
    const updatedCategories = categories.filter((category) => category.id !== categoryId);
    setCategories(updatedCategories);
  };
  
  const addSubcategory = (categoryId: number) => {
    const newSubcategory = {
      id: categories[categoryId - 1].subcategories.length + 1,
      label: newCategoryLabel,
    };

    const updatedCategories = [...categories];
    updatedCategories[categoryId - 1].subcategories.push(newSubcategory);
    setCategories(updatedCategories);
    setNewCategoryLabel("");
    setSelectedCategoryId(null);
  };
  const addCategory = () => {
    const newCategory = {
      id: categories.length + 1,
      label: newCategoryLabel,
      icon: <LocationIcon />,
      subcategories: [], // Initialize subcategories array
    };

    setCategories([...categories, newCategory]);
    setNewCategoryLabel(""); // Clear the input field after adding a category
  };

  return (
    <Box flex={1} color={"primary"}>
      <Container>
        <Box px={4} py={4} width="100%">
          <Box pb={2}>
            <Typography variant="h4">Categories</Typography>
          </Box>
          {categories.map((category) => (
            <Accordion key={category.id}>
             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
  <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
    <Box>
      <ListItemIcon>{category.icon}</ListItemIcon>
      <Typography>{category.label}</Typography>
      
    </Box>

    {/* Category Button */}
    <Box>
    <Link to="/itempage" style={{ textDecoration: "none", color: "inherit", marginRight: "20px" }}>
              Item
            </Link>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          setSelectedCategoryId(
            (prevId) => (prevId === category.id ? null : category.id)
          )
        }
      >
        {selectedCategoryId === category.id ? "Cancel" : "Add Subcategory"}
      </Button>
      <IconButton onClick={() => deleteCategory(category.id)}>
        <DeleteOutline />
      </IconButton>
    </Box>
  </Box>
</AccordionSummary>


              <AccordionDetails>
                <div>
                  {category.subcategories.map((subcategory) => (
                    <Typography key={subcategory.id}>{subcategory.label}</Typography>
                  ))}
                  {selectedCategoryId === category.id && (
                    <div>
                      <TextField
                        label="New Subcategory Label"
                        value={newCategoryLabel}
                        onChange={(e) => setNewCategoryLabel(e.target.value)}
                        variant="outlined"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => addSubcategory(category.id)}
                      >
                        Add Subcategory
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
          <Box pt={2} style={{ marginLeft: "600px" }}>
            <TextField
              label="New Category Label"
              value={newCategoryLabel}
              onChange={(e) => setNewCategoryLabel(e.target.value)}
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addCategory}
              style={{ height: "56px" }}
            >
              Add Category
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

type Props = {
  children: React.ReactNode;
};

export const CategoriesContext = React.createContext({
  categories: [] as Category[],
  setCategories: (categories: Category[]) => {},
});

export const useCategoriesContext = () => {
  const context = React.useContext(CategoriesContext);
  console.log(context);
  if (!context)
    throw new Error(
      "useCategoriesContext must be used within a CategoriesProvider"
    );
  return context;
};

export const CategoriesProvider: React.FC<Props> = ({ children }) => {
  const [categories, setCategories] = React.useState<Category[]>([
    {
      id: 1,
      label: "Inbox",
      icon: <InboxIcon />,
      subcategories: [],
    },
    {
      id: 2,
      label: "Mail",
      icon: <MailIcon />,
      subcategories: [],
    },
    {
      id: 3,
      label: "Alarm",
      icon: <AlarmIcon />,
      subcategories: [],
    },
  ]);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}

// const GreenPage = () => {
//   return (
//     <div style={{ backgroundColor: "green", width: "100%", height: "100vh" }}>
//       <h1 style={{ color: "white", textAlign: "center", paddingTop: "50vh" }}>
//         This is a Green Page
//       </h1>
//     </div>
//   );
// };

export default function App() {
  const classes = useStyles();

  return (
    <Router>
      {/* TopContent */}
      <CategoriesProvider>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, top: "0" }}>
          <Toolbar>
            {/* Navigation Links */}
            <Link
              to="/green"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Go to Green Page
            </Link>
          </Toolbar>
        </AppBar>

        {/* Lower content */}
        <Box display="flex" position="relative">
          <Box>
            <Sidebar />
          </Box>
          <Box marginTop="80px">
            <MainContent />
          </Box>
        </Box>
        {/* <Route path="/green" Component={GreenPage} /> */}
      </CategoriesProvider>
    </Router>
  );
}
