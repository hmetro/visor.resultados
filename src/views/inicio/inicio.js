import Auth from '../../models/auth';
import HeaderPrivate from '../layout/header-private';
import MenuPanel from '../menu/panel';
import App from '../app';



const Inicio = {
    oninit: () => {
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Inicio | " + App.title;
        _Main();
    },
    view: () => {
        return [
            m(HeaderPrivate),
            m(MenuPanel),
        ];
    },

};




export default Inicio;