var _modulos_ = [
    { id: 1, title: "Ver Exámen Online (GE ZeroFootPrint)", icon: "doctor", url: "/resultados/imagen" },
    { id: 2, title: "Ver Informe", icon: "doctor", url: "/resultados/laboratorio" },

];


function PageResultadoImagen(data) {
    this.data = data.attrs;
}

function Modulos() { }

function ButtonReload() { }

ButtonReload.prototype.view = function () {
    return [

        m("div.button-menu-right-reload", { "style": { "display": "flex" } },
            m("a.btn.fadeInDown-slide.position-relative.animated.pl-3.pr-3.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2", {
                onclick: (e) => {
                    e.preventDefault();
                    window.location.reload();
                },
            },
                m("i.icofont-refresh", { "style": { "font-size": "x-large" } })
            )
        )

    ];
}


Modulos.prototype.alertURL = function (url) {
    alert(url)
}

Modulos.prototype.view = function () {
    return _modulos_.map(function (i) {

        if (i.id == 1) {
            return m("div.col-sm-12.col-md-12.col-lg-6",
                m(".", {
                    onclick: () => {
                        Modulos.prototype.alertURL(i.url)
                    }
                }, [
                    m("div.single-service.type-1.radius-10.position-relative.service-wrapper.s-dp-10-60.m-mb-50", [

                        m("h5.text-dark2.mb-3.position-relative.pt-2",
                            m("span.icofont-monitor.mr-2.text-grad-1.fz-50"),
                            i.title
                        )
                    ])
                ])
            )
        }

        if (i.id == 2) {
            return m("div.col-sm-12.col-md-12.col-lg-6",
                m("a", {
                    href: i.url,

                }, [
                    m("div.single-service.type-1.radius-10.position-relative.service-wrapper.s-dp-10-60.m-mb-50", [
                        m("h5.text-dark2.mb-3.position-relative.pt-2",
                            m("span.icofont-patient-file.text-grad-1.fz-50"),
                            i.title
                        )
                    ])
                ])
            )
        }



    })
}

PageResultadoImagen.prototype.oninit = function () {
    this.view = this.loader;
    let _state = this;
    setTimeout(function () { _state.fetch(); }, 0);
}

PageResultadoImagen.prototype.getIdResultado = function () {
    console.log('getIdResultado', this.data.id)

}

PageResultadoImagen.prototype.fetch = function () {
    this.getIdResultado()
    this.getData()
}

PageResultadoImagen.prototype.getData = function () {

    console.log('PageResultadoImagen', this.data)
    this.view = this.getDataView;
    m.redraw();

}

PageResultadoImagen.prototype.loader = function () {
    return [
        m("div.preloader",
            m("div.preloader-inner",
                m("div.loader-content",
                    m("span.icon-section-wave.d-inline-block.text-active.mt-3.",),
                )
            ),

        ),
        m(ButtonReload)
    ];
}

PageResultadoImagen.prototype.getDataView = function () {
    return [
        m("section.m-bg-1",
            m("div.container",
                m("div.row",
                    m("div.col-12",
                        m("div.text-right.m-mt-70", [

                            m("h3.mb-1.text-dark", {
                                style: {
                                    "cursor": "pointer"
                                },
                                onclick: () => {
                                    m.route.set('resultados/imagen');
                                }
                            },
                                m("i.icofont-close-circled"),
                            ),


                        ]),
                        m("div.text-left.m-mt-40", [

                            m("h5.mb-1.text-dark",
                                m("i.icofont-file-document.mr-2"),
                                ' RADIOGRAFÍA COLUMNA CERVICAL CHEQUEO PER '
                            ),
                            m("h5.mb-1.text-dark",
                                m("p.designation.text-uppercase", [
                                    "FECHA: ",
                                    "MEDICO: ",

                                ]),



                            ),

                        ])
                    )
                ),
                m("div.row.m-pt-20.m-pb-60", [
                    m(Modulos)
                ])
            )
        ),
        m("div.button-menu-center.text-center",
            m("a.btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2[href='/']", [
                m("i.icofont-home"),
                " Inicio "
            ])
        )
    ];
}

PageResultadoImagen.prototype.view = function () { };


export default PageResultadoImagen;