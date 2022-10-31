import Auth from '../../models/auth';
import App from '../app';
import Loader from '../loader';


const DataProviderInter = {
    data: [],
    filteredData: [],
    searchField: "",
    show: "",
    fetch: () => {

        DataProviderInter.filterData();


    },
    loadData: function () {
        DataProviderInter.fetch();

    },
    filterData: function () {
        var to = Math.min(DataProviderInter.from + DataProviderInter.count, DataProviderInter.data.length + 1);
        DataProviderInter.filteredData = [];
        for (var i = DataProviderInter.from - 1; i < to - 1; i++) {
            DataProviderInter.filteredData.push(DataProviderInter.data[i]);
        }
    },
    from: 1,
    count: 10,
    setFrom: function (from) {
        DataProviderInter.from = parseInt(from);
        DataProviderInter.filterData();
    },
    setCount: function (count) {
        DataProviderInter.count = parseInt(count);
        DataProviderInter.filterData();
    },
    nextPage: function () {
        var from = DataProviderInter.from + DataProviderInter.count;
        if (from > DataProviderInter.data.length)
            return;
        DataProviderInter.from = from;
        DataProviderInter.filterData();
    },
    lastPage: function () {
        DataProviderInter.from = DataProviderInter.data.length - DataProviderInter.count + 1;
        DataProviderInter.filterData();
    },
    prevPage: function () {
        DataProviderInter.from = Math.max(1, DataProviderInter.from - DataProviderInter.count);
        DataProviderInter.filterData();
    },
    firstPage: function () {
        DataProviderInter.from = 1;
        DataProviderInter.filterData();
    },
    rowBack: function () {
        DataProviderInter.from = Math.max(1, DataProviderInter.from - 1);
        DataProviderInter.filterData();
    },
    rowFwd: function () {
        if (DataProviderInter.from + DataProviderInter.count - 1 >= DataProviderInter.data.length)
            return;
        DataProviderInter.from += 1;
        DataProviderInter.filterData();
    }
};


const DataProvider = {
    data: [],
    filteredData: [],
    searchField: "",
    show: "",
    fetch: () => {



        DataProvider.data = [];
        Loader.show = "";
        Loader.buttonShow = "";
        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/pacientes/resultados/imagen",
            headers: {
                "Authorization": localStorage.accessToken,
            },
        })
            .then(function (result) {
                Loader.show = "d-none";
                Loader.buttonShow = "d-none";
                DataProvider.data = result.data;
                DataProvider.filterData();

            })
            .catch(function (e) {
                DataProvider.fetch();
            })




    },
    loadData: function () {
        DataProvider.fetch();
    },
    filterData: function () {
        var to = Math.min(DataProvider.from + DataProvider.count, DataProvider.data.length + 1);
        DataProvider.filteredData = [];
        for (var i = DataProvider.from - 1; i < to - 1; i++) {
            DataProvider.filteredData.push(DataProvider.data[i]);
        }
    },
    from: 1,
    count: 10,
    setFrom: function (from) {
        DataProvider.from = parseInt(from);
        DataProvider.filterData();
    },
    setCount: function (count) {
        DataProvider.count = parseInt(count);
        DataProvider.filterData();
    },
    nextPage: function () {
        var from = DataProvider.from + DataProvider.count;
        if (from > DataProvider.data.length)
            return;
        DataProvider.from = from;
        DataProvider.filterData();
    },
    lastPage: function () {
        DataProvider.from = DataProvider.data.length - DataProvider.count + 1;
        DataProvider.filterData();
    },
    prevPage: function () {
        DataProvider.from = Math.max(1, DataProvider.from - DataProvider.count);
        DataProvider.filterData();
    },
    firstPage: function () {
        DataProvider.from = 1;
        DataProvider.filterData();
    },
    rowBack: function () {
        DataProvider.from = Math.max(1, DataProvider.from - 1);
        DataProvider.filterData();
    },
    rowFwd: function () {
        if (DataProvider.from + DataProvider.count - 1 >= DataProvider.data.length)
            return;
        DataProvider.from += 1;
        DataProvider.filterData();
    }
};

const dataView = {
    show: "",
    oninit: DataProvider.loadData,
    view: () => {
        return m('table.w-100.mt-5.' + dataView.show, [
            m('tbody', DataProvider.filteredData.map(function (d) {
                return [
                    m("div.bg-white.pt-4.pl-4.pb-4.pr-4.info-box.m-mb-30.radius-5", {
                        "style": { "border-color": "#0aa1eb" }
                    },
                        [
                            m("h4.mb-0", [
                                m("i.icofont-file-document.mr-2"),
                                d['ESTUDIO']
                            ]

                            ),
                            m("div.media.",
                                m("div.media-body",
                                    [
                                        m("p.designation.text-uppercase", [
                                            "FECHA: " + d['FECHA'],

                                        ]),

                                        m("h6",
                                            "MÉDICO: " + d['MEDICO'],
                                        ),

                                        m("div.text-right", [
                                            m("a.btn.medim-btn.solid-btn.mt-4.text-medium.radius-pill.text-active.text-uppercase.bg-transparent.position-relative", {
                                                href: d['URL']
                                            },
                                                " Ver Resultado "
                                            )
                                        ])

                                    ]
                                )
                            )
                        ]
                    ),

                ]
            }))
        ]);
    }
};

const dataViewInter = {
    show: "d-none",
    oninit: DataProviderInter.loadData,
    view: () => {

        return m('table.w-100.mt-5.' + dataViewInter.show, [
            m('tbody', DataProviderInter.filteredData.map(function (d) {
                return [
                    m("div.bg-white.pt-4.pl-4.pb-4.pr-4.info-box.m-mb-30.radius-5", {
                        "style": { "border-color": "#0aa1eb" }
                    },
                        [
                            m("h4.mb-0", [
                                m("i.icofont-ui-user"),
                                " " + ((d['CLASIFICACION_MEDICO'] == 'TRA') ? d['NOMBRE_PACIENTE'] : d['NOMBRE_PACIENTE'] + " - Interconsulta")
                            ]

                            ),
                            m("div.media.",
                                m("div.media-body",
                                    [
                                        m("p.designation.text-uppercase", [
                                            d['EDAD'],
                                            " Año(s)",
                                            " Especialidad: ",
                                            d['ESPECIALIDAD'],
                                            " Médico: ",
                                            d['NOMBRE_MEDICO'],
                                        ]),

                                        m("h6",
                                            (d['DG_PRINCIPAL'] !== null) ? "Dg: " + d['DG_PRINCIPAL'] : "Dg: NO DISPONIBLE",
                                            (" Fecha Admisión: " + d['FECHA_ADMISION']),
                                            (d['NRO_HABITACION'] !== null) ? " Ubicación: " + d['NRO_HABITACION'] : " Ubicación: NO DISPONIBLE",
                                            ((PageResultadosImagen.codMedico === "0") ? [
                                                (d['DISCRIMINANTE'] == 'EMA') ? " En Emergencia " : " En Hospitalización "

                                            ] : [
                                                (d['CLASIFICACION_MEDICO'] === 'TRA') ? " MED: TRATANTE" : " MED: INTERCONSULTA ",

                                            ])
                                        ),

                                        m("div.text-right", [
                                            m("a.btn.medim-btn.solid-btn.mt-4.text-medium.radius-pill.text-active.text-uppercase.bg-transparent.position-relative", {
                                                href: "#!/paciente/" + d['HC']
                                            },
                                                " Ver Paciente "
                                            )
                                        ])

                                    ]
                                )
                            )
                        ]
                    ),

                ]
            }))
        ]);
    }
};


const pageTool = {
    view: () => {

        if (DataProvider.data !== undefined && dataView.show == "") {
            if (DataProvider.data.length === 0) {

                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(0) Resultado(s)'),
                    ]),
                ]

            } else if (DataProvider.data.length > 10) {

                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(' + DataProvider.data.length + ') Resultado(s) '),
                    ]),
                    m('div.d-flex.w-100.text-center.mt-5', [
                        m("div.w-50.w-20", [


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProvider.rowBack(); }
                            },
                                " << Anterior "
                            ),
                        ]),

                        m("div.w-50.w-20", [

                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProvider.rowFwd(); }
                            },
                                " Siguiente >>"
                            ),



                        ])
                    ]),
                    m('div.d-flex.w-100.text-center.mt-5', [
                        m("div.w-50.w-20", [
                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProvider.firstPage(); }
                            },
                                " | Inicio "
                            ),

                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProvider.prevPage(); }
                            },
                                " < Pág. Ant. "
                            ),

                        ]),

                        m("div.w-50.w-20", [


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProvider.nextPage(); }
                            },
                                " Pág. Sig. > "
                            ),


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProvider.lastPage(); }
                            },
                                " Fin | "
                            ),

                        ])
                    ])

                ]

            } else {
                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(' + DataProvider.data.length + ') Resultado(s) '),
                    ]),
                ]


            }
        }


    }
};


const pageToolInter = {
    view: () => {

        if (DataProviderInter.data !== undefined && dataViewInter.show == "") {
            if (DataProviderInter.data.length === 0) {

                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(0) Resultado(s)'),
                    ]),
                ]

            } else if (DataProviderInter.data.length > 10) {

                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(' + DataProviderInter.data.length + ') Resultado(s) '),
                    ]),
                    m('div.d-flex.w-100.text-center.mt-5', [
                        m("div.w-50.w-20", [


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProviderInter.rowBack(); }
                            },
                                " << Anterior "
                            ),
                        ]),

                        m("div.w-50.w-20", [

                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProviderInter.rowFwd(); }
                            },
                                " Siguiente >>"
                            ),



                        ])
                    ]),
                    m('div.d-flex.w-100.text-center.mt-5', [
                        m("div.w-50.w-20", [
                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProviderInter.firstPage(); }
                            },
                                " | Inicio "
                            ),

                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProviderInter.prevPage(); }
                            },
                                " < Pág. Ant. "
                            ),

                        ]),

                        m("div.w-50.w-20", [


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProviderInter.nextPage(); }
                            },
                                " Pág. Sig. > "
                            ),


                            m("btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2.mr-2", {
                                type: "button",
                                "style": { "cursor": "pointer" },

                                onclick: function () { DataProviderInter.lastPage(); }
                            },
                                " Fin | "
                            ),

                        ])
                    ])

                ]

            } else {
                return [
                    m("div.text-center.w-100.mt-5", [
                        m('span', '(' + DataProviderInter.data.length + ') Resultado(s) '),
                    ]),
                ]


            }
        }

    }
};

const iPaciente = {
    view: (_data) => {
        return [
            m("div.intro-box.bg-white.radius-5", [
                m("div.intro-icon.rounded-circle.grad-bg--5",
                    m("span.icofont-user.text-white")
                ),
                m("h3.m-text-2.mb-3",
                    _data.attrs.NOMBRE_PACIENTE
                ),
                m("p", [
                    m("span",
                        "Ingreso:"
                    ),
                    m("span",
                        _data.attrs.FECHA_ADMISION
                    )
                ]),
                m("p", [
                    m("span",
                        "Edad:"
                    ),
                    m("span",
                        _data.attrs.EDAD + " Años"
                    )
                ]),
                m("p", [
                    m("span",
                        "Emergencia:"
                    ),
                    m("span",
                        ((_data.attrs.NRO_HABITACION == null) ? "Ubicación Pendiente" : _data.attrs.NRO_HABITACION) + ", Especialidad: " + _data.attrs.ESPECIALIDAD
                    )
                ]),
                m("p", [
                    m("span",
                        "Dg."
                    ),
                    m("span",
                        (_data.attrs.DG_PRINCIPAL !== null) ? _data.attrs.DG_PRINCIPAL : "Diagnóstico Pendiente"
                    )
                ]),
                m("div.text-right", [
                    m("a.btn.fadeInDown-slide.mt-4.animated.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-uppercase.text-white", {
                        href: "#!/paciente/" + _data.attrs.HC.slice(0, -2)
                    },
                        " Ver Paciente "
                    )
                ]),

            ]),

        ]
    }
};

const ButtonHelp = {
    help: false,
    view: () => {
        return [

            m("div.button-menu-right-reload", {
                "style": { "display": "flex" },
                class: (Loader.buttonShow == 'd-none' ? '' : 'd-none'),
            },
                m("a.btn.fadeInDown-slide.position-relative.animated.pl-3.pr-3.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2", {
                    onclick: (e) => {
                        e.preventDefault();
                        ButtonHelp.help = !ButtonHelp.help;
                    },
                },
                    m("i.icofont-question", { "style": { "font-size": "x-large" } })
                )
            )
        ];

    },
};



const PageResultadosImagen = {
    codMedico: "",
    oninit: () => {
        Loader.show = "";
        Loader.buttonShow = "";
        PageResultadosImagen.codMedico = Auth.codMedico;
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }
    },
    oncreate: () => {
        document.title = "Resultados de Imagen | " + App.title;

    },
    view: () => {
        return [
            m(Loader),
            m("section.m-bg-1",
                m("div.container", {
                    class: (!ButtonHelp.help ? '' : 'd-none')
                },
                    m("div.row",
                        m("div.col-md-6.offset-md-3",
                            m("div.text-center.m-mt-70", [
                                m("h2.m-0.text-dark",
                                    "Resultados de Imagen "
                                ),
                                m("span.icon-section-wave.d-inline-block.text-active.section-wave.mt-3.active")
                            ])
                        )
                    ),

                    m("div.row.m-pt-20.m-pb-60.m-mt-20", {
                        class: (!ButtonHelp.help ? '' : 'd-none')
                    }, [
                        m("div.col-12.pd-r-0.pd-l-0.pd-b-20",
                            m(dataView),
                            m(pageTool),
                        ),
                        m("div.col-12.pd-r-0.pd-l-0.pd-b-20",
                            m(dataViewInter),
                            m(pageToolInter),
                        )
                    ]),

                ),
                m("div.container", {
                    class: (ButtonHelp.help ? '' : 'd-none')
                },
                    m("div.row",
                        m("div.col-md-6.offset-md-3",
                            m("div.text-center.m-mt-70", [
                                m("h2.m-0.text-dark",
                                    "Ayuda"
                                ),
                                m("span.d-inline-block.text-active.mt-3.active", 'Soporte Metrovirtual: ¡Estamos aquí, para lo que necesites!.')
                            ])
                        )
                    ),


                    m("div.row.m-pt-20.m-pb-60.m-mt-20", [
                        m("div.col-12.pd-r-0.pd-l-0.pd-b-20",
                            m("div.row.m-mb-60.m-mt-10.", [
                                m("div.col-12",
                                    m("div.bg-white.mb-0.position-relative.has-float-icon.pt-4.pl-4.pb-4.pr-4.info-box.m-mtb-20.radius-5", [
                                        m("span.position-absolute.flaot-icon",
                                            m("i.icofont-stethoscope-alt.text-active")
                                        ),
                                        m("h5.m-text-2.mb-3",
                                            m("p.designation", [
                                                " ¿No encuentro mi resultado? ",
                                            ]),
                                        ),

                                    ]),
                                    m("div.bg-white.mb-0.position-relative.has-float-icon.pt-4.pl-4.pb-4.pr-4.info-box.m-mtb-20.radius-5", [
                                        m("span.position-absolute.flaot-icon",
                                            m("i.icofont-stethoscope-alt.text-active")
                                        ),
                                        m("h5.m-text-2.mb-3",
                                            m("p.designation.", [
                                                " Necesito un resultado anterior al 2019",
                                            ]),
                                        ),

                                    ]),
                                    m("div.bg-white.mb-0.position-relative.has-float-icon.pt-4.pl-4.pb-4.pr-4.info-box.m-mtb-20.radius-5", [
                                        m("span.position-absolute.flaot-icon",
                                            m("i.icofont-stethoscope-alt.text-active")
                                        ),
                                        m("h5.m-text-2.mb-3",
                                            m("p.designation", [
                                                " Solicitar duplicado en físico (CD) (USB) a Domicilio. ",
                                            ]),
                                        ),

                                    ])
                                ),


                            ]),
                            m("div.row",
                                m("div.col-md-12.text-center.m-mb-50",
                                    m("a.btn.bordered-blue.fadeInDown-slide.animated.medim-btn.btn-bordered.mt-0.text-medium.radius-pill.bg-transparent.text-active.text-uppercase.[href='#!/salir']",
                                        " Salir "
                                    )
                                )
                            )
                        ),

                    ])
                )
            ),
            m(ButtonHelp),
            m("div.button-menu-center.text-center",
                m("a.btn.fadeInDown-slide.position-relative.animated.pl-4.pr-4.lsp-0.no-border.bg-transparent.medim-btn.grad-bg--3.solid-btn.mt-0.text-medium.radius-pill.text-active.text-white.s-dp-1-2[href='/']", [
                    m("i.icofont-home"),
                    " Inicio "
                ])
            )

        ];
    },

};



function countWords(str) {
    return str.trim().split(/\s+/).length;
}


export default PageResultadosImagen;