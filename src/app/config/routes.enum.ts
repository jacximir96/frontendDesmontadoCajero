export enum routes{
    POST_SESION_VALIDA_MESAS_EN_USO = 'ValorarConclusionSesionUsuarioMesasEnUso',
    POST_VALORAR_CONCLUSION_SESSION_CUENTAS_ABIERTAS  = 'ValorarConclusionSesionUsuarioCuentasAbiertas',
    POST_VALIDAR_EXISTENCIA_PEDIDOS_OENDIENTES_APP = 'ValidarExistenciaPedidosPendientesAppUsuario',
    POST_OBTENER_PEDIDOS_PENDIENTES_RESTAURANTE = 'ObtenerPedidosPendientesAppRestaurante',
    POST_VALIDAR_FONDO_ASIGNADO_USUARIO = 'ValidarRetiroFondoAsignadoUsuario',
    POST_REGISTRAR_INGRESO_EGRESO_CAJA_FORMA_PAGO_CASHLESS_ESTACION = 'RegistrarIngresoEgresoCajaFormaPagoCashlessEstacion',
    POST_CONSOLIDAR_TRANSACCIONES_ESTACION = 'ObtenerCuponesCanjeadosEstacion',
    POST_OBTENER_CUPONES_CANJEADOS_ESTACION = 'ConsolidarTransaccionesEstacion',
    POST_CONSOLIDAR_TRANSACCIONES_ESTACION_FORMA_PAGO_TARJETA = 'ConsolidarTransaccionesEstacionFormaPagoTarjetaIn',
    POST_CALCULAR_VENTAS_ESTACION = 'CalcularTotalVentasEstacion',
    POST_DESASIGNAR_USUARIO = 'DesasignarUsuario',
    POST_AGRUPAR_FORMAS_PAGO = 'AgruparFormasPago',
    POST_OBTENER_DENOMINACION_BILLETES = 'RDE_ObtenerDenominacionBilleteMonedaComprometidoRetiroDineroEstacion',
    POST_OBTENER_EFECTIVO_PROCESO = 'ObtenerEfectivoProcesoEstacion',
    POST_CONSULTAR_RETIROS_ESTACION = 'RDE_ConsolidarTransaccionesEstacion',
    POST_TOTAL_VENTA_ESTACION = 'CalcularTotalVentasEstacion',

    /**Routes Arqueo de Caja */
    POST_RDE_CONSOLIDAR_TRANSACCIONES_ESTACION = 'RDE_ConsolidarTransaccionesEstacion',
    POST_RDE_CONSOLIDAR_TRANSACCIONES_AGREGADORES_ESTACION = 'RDE_ConsolidarTransaccionesAgregadoresEstacion',


    /**Routes Home Page */
    GET_OBTENER_OPCIONES_MENUS = 'ObtenerOpcionesMenus',
    POST_OBTENER_FONDO_ASIGNADO_ESTACION = 'ObtenerFondoAsignadoUsuarioEstacion',

    /**Aperturar Cajon */
    POS_APERTURAR_CAJON = 'ACE_AbrirCajaEstacionServicioAPIAperturaCaja'
}