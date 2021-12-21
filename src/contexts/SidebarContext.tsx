import { ReactNode, createContext, useState, useEffect } from 'react';
// @mui
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type SidebarContextProps = {
  isCollapse?: boolean;
  onToggleCollapse: VoidFunction;
};

const initialState: SidebarContextProps = {
  onToggleCollapse: () => {},
};

const SidebarContext = createContext(initialState);

type SidebarProviderProps = {
  children: ReactNode;
};

function SidebarProvider({ children }: SidebarProviderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    isMobile ?? setCollapse(false);
  }, [isMobile]);

  const handleToggleCollapse = () => {
    setCollapse(collapse => !collapse );
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapse: collapse,
        onToggleCollapse: handleToggleCollapse,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export { SidebarProvider , SidebarContext  };
