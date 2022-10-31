import Auth from '../../models/auth';
import HeaderPrivate from '../layout/header-private';
import PageResultadosImagen from './page';
import App from '../app';



const ResultadosImagen = {
    oninit: () => {
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Mis ResultadosImagen | " + App.title;
        submitBusqueda();
        App.mainLayout();
    },
    view: () => {
        return [
            m(HeaderPrivate),
            m(PageResultadosImagen),
            m("footer", [

                m("div.footer-bottom.text-center.m-mt-120.m-bg-1.pt-4.pb-4",
                    m("div.container",
                        m("div.row",
                            m("div.col-md-12", [
                                m("img[alt='HM'][src='assets/images/logo-hm.svg'][width='75rem']"),
                                m("p.mb-1.mt-1", [
                                    m.trust("&copy;"),
                                    new Date().getFullYear() + ". Todos los derechos reservados."
                                ])

                            ]

                            )
                        )
                    )
                ),
                m("div.footer-bottom.text-center.m-mt-120.m-bg-1.pt-4.pb-4",
                    m("div.container",

                    )
                )
            ])
        ];
    },

};



function submitBusqueda() {
    document.onkeypress = function (e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == "13") {
            console.log('OK');
        }
    };
}


export default ResultadosImagen;