import React from "react";
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


export const CategoriesContext = React.createContext({
  categories: [] as Category[],
  setCategories: (categories: Category[]) => {},
});

type Props = {
  children: React.ReactNode;
};

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
};
