import LoginView from "../components/view/login/LoginView";
import RegisterView from "../components/view/login/RegisterView";
import PublicLayout from "../components/layouts/PublicLayout";
import PrivateLayout from "../components/layouts/PrivateLayout";
import HomeView from "../components/view/frontoffice/home/HomeView";
import AddProductView from '../components/view/backoffice/products/AddProductView';
import CartView from "../components/view/frontoffice/cart/CartView";
import PaymentView from "../components/view/frontoffice/payment/PaymentView";
import VendorsShowView from "../components/view/frontoffice/vendors/VendorsShowView";
import AddMarket from "../components/view/backoffice/market/AddMarket";
import Markets from '../components/view/backoffice/market/Markets';
import EditMarket from '../components/view/backoffice/market/EditMarket'
import AdminLayout from '../components/layouts/AdminLayout';
import Products from '../components/view/backoffice/products/Products';
import VendorLayout from '../components/layouts/VendorLayout';
import EditProductView from '../components/view/backoffice/products/EditProductView';
import DropOffView from "../components/view/frontoffice/dropOff/DropOffView";
import ViewProfil from "../components/view/frontoffice/user/ViewProfil";
import ViewShowCart from "../components/view/frontoffice/user/ViewShowCart";

const routes = [
    {
        path: '/login',
        title: 'login',
        breads: [{ title: 'login', href: '/login' },],
        components: LoginView,
        private: false,
        layout: PublicLayout,
    },
    {
        path: '/register',
        title: 'register',
        breads: [{ title: 'register', href: '/register' },],
        components: RegisterView,
        private: false,
        layout: PublicLayout,
    },
    {
        path: '/customers/home',
        title: 'Accueil',
        breads: [{title:'Catalogue', href:'/customers/home'},],
        components: HomeView,
        private: true,
        layout: PrivateLayout,
    },
    {
        path: '/customers/cart',
        title: 'Panier',
        breads: [
            {title:'Catalogue', href:'/customers/home'},
            {title:'Panier', href:'/customers/cart'},
        ],
        components: CartView,
        private: true,
        layout: PrivateLayout,
    },
    {
        path: '/customers/dropoff',
        title: 'Adresse de Livraison',
        breads: [
            {title:'Catalogue', href:'/customers/home'},
            {title:'Panier', href:'/customers/cart'},
            {title:'Adresse de Livraison', href:'/customers/dropoff'},
        ],
        components: DropOffView,
        private: true,
        layout: PrivateLayout,
    },
    {
        path: '/customers/payment/:id',
        title: 'Paiement',
        breads: [
            {title:'Catalogue', href:'/customers/home'},
            {title:'Panier', href:'/customers/cart'},
            {title:'Adresse de Livraison', href:'/customers/dropoff'},
            {title:'Paiement', href:'/customers/payment'},
        ],
        components: PaymentView,
        private: true,
        layout: PrivateLayout,
    },
    {
        path: '/customers/carts/:id',
        title: 'Commande',
        breads: [
            {title:'Catalogue', href:'/customers/home'},
            {title:'Mon Profil', href:'/customers/user'},
            {title:'Commande', href:'/customers/user'},
        ],
        components: ViewShowCart,
        private: true,
        layout: PrivateLayout,
    },
    {
        path: '/customers/user',
        title: 'Mon Profil',
        breads: [
            {title:'Catalogue', href:'/customers/home'},
            {title:'Mon Profil', href:'/customers/user'},
        ],
        components: ViewProfil,
        private: true,
        layout: PrivateLayout,
    },
    {
        path: '/customers/vendors/:id',
        title: 'Commerçant',
        breads: [
            {title:'Catalogue', href:'/customers/home'},
            {title:'Commerçant', href:'/customers/home'},
        ],
        components: VendorsShowView,
        private: true,
        layout: PrivateLayout,
    },
    {
        path: '/admin/home',
        title: 'markets',
        components: Markets,
        breads: [{ title: 'Les marchés', href: '/admin/home' },],
        private: true,
        layout: AdminLayout,
    },
    {
        path: '/admin/markets/new',
        title: 'add-market',
        components: AddMarket,
        breads: [
            { title: 'Les marchés', href: '/admin/home' },
            { title: 'Ajouter un marché', href: '/admin/markets/new' },
        ],
        private: true,
        layout: AdminLayout,
    },
    {
        path: '/admin/markets/edit/:id',
        title: 'Modifier le marché',
        breads: [
            { title: 'Les marchés', href: '/admin/home' },
            { title: 'Modifier le marché', href: '/admin/edit-market/:id' },
        ],
        components: EditMarket,
        private: true,
        layout: AdminLayout,
    },
    {
        path: '/vendors/home',
        title: 'Les produits',
        breads: [{ title: 'Les produits', href:  '/vendors/home' },],
        components: Products,
        private: true,
        layout: VendorLayout,
    },
    {
        path: '/vendors/products/new',
        title: 'Ajouter un produit',
        breads: [
            { title: 'Les produits', href:  '/vendors/home' },
            { title: 'Ajouter un produit', href: '/vendors/products/new', },
        ],
        components: AddProductView,
        private: true,
        layout: VendorLayout,
    },
    {
        path: '/vendors/products/edit/:id',
        title: 'Modifier le produit',
        breads: [
            { title: 'Les produits', href: '/vendors/home' },
            { title: 'Modifier le produit', href:  '/vendors/home' },
        ],
        components: EditProductView,
        private: true,
        layout: VendorLayout,
    }
];

export default routes;