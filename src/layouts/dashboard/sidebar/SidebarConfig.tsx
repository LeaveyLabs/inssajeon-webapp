// components
import CategoryIcon from '@mui/icons-material/Category';
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { ReactComponent as LogoSVG } from 'src/assets/logos/logo.svg';

// ----------------------------------------------------------------------


const sidebarConfig = [
  {
    subheader: 'Explore',
    items: [
      { title: '홈', path: '/', icon: <LogoSVG/> },
      { title: '범주별', path: '/categories', icon: <CategoryIcon/> },
      { title: '유행 차트', path: '/charts', icon: <TrendingUpIcon/> },
    ],
  },
  {
    subheader: 'More',
    items: [
      { title: '인싸전이란?', path: '/about', icon: <InfoOutlinedIcon/> },
      { title: '자주 묻는 질문', path: '/faq', icon: <HelpOutlineSharpIcon/> },
    ]
  },
];

export default sidebarConfig;
