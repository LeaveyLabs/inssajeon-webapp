import { useContext } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';

// ----------------------------------------------------------------------

const useCollapseSidebar = () => useContext(SidebarContext);

export default useCollapseSidebar;
