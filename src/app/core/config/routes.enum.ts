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
    POST_AGRUPAR_FORMAS_PAGO = 'TD_ObtenerFormaPago',
    POST_OBTENER_EFECTIVO_PROCESO = 'ObtenerEfectivoProcesoEstacion',
    POST_CONSULTAR_RETIROS_ESTACION = 'RDE_ConsolidarTransaccionesEstacion',
    POST_TOTAL_VENTA_ESTACION = 'CalcularTotalVentasEstacion',

    /**Transferencia de datos */
    POST_OBTENER_DENOMINACION_BILLETES = 'TD_ObtenerDenominacionBilleteMoneda',

    /**Routes Arqueo de Caja */
    POST_ADE_CONSOLIDAR_TRANSACCIONES_ESTACION = 'ADE_ConsolidarTransaccionesEstacion',
    POST_ADE_CONSOLIDAR_TRANSACCIONES_DATAFAST = 'ADE_ObtenerTransaccionesDatafastEstacion',
    POST_ADE_IMPRIMIR_ARQUEO = 'ADE_ImprimirReporteArqueoDineroEstacion',
    POS_ADE_BILLETES_COMPROMETIDOS = 'ADE_ObtenerDenominacionBilleteMonedaComprometidoArqueoDineroEstacion',
    POS_ADE_COMPROMETER_BILLETES = 'ADE_ComprometerDenominacionBilleteMonedaArqueoDineroEstacion',
    POS_ADE_COMPROMETER_DINERO_ARQUEO = 'ADE_ComprometerDineroArqueoDineroEstacion',
    POST_ADE_CANCELAR_ARQUEO = 'ADE_CancelarArqueoDineroEstacion',
    POST_ADE_ARQUEAR_DINERO = 'ADE_ArquearDineroEstacion',
    POST_ADER_CONSOLIDAR_COMPROMISO_BILLETES_MONEDAS = 'ADE_ConsolidarCompromisoDenominacionBilleteMonedaArqueoDineroEstacion',

    /**Retiro de Efectivos */
    POST_RDE_BILLETES_COMPROMETIDOS = 'RDE_ObtenerDenominacionBilleteMonedaComprometidoRetiroDineroEstacion',
    POST_RDE_COMPROMETER_DINERO_RETIRO = 'RDE_ComprometerDineroRetiroDineroEstacion',
    POST_RDE_COMPROMETER_BILLETES = 'RDE_ComprometerDenominacionBilleteMonedaRetiroDineroEstacion',
    POST_RDE_CANCELAR_RETIRO = 'RDE_CancelarRetiroDineroEstacion',
    POST_RDE_CONSOLIDAR_COMPROMISO_BILLETES_MONEDAS = 'RDE_ConsolidarCompromisoDenominacionBilleteMonedaRetiroDineroEstacion',
    POST_RDE_RETIRAR_DINERO = 'RDE_RetirarDineroEstacion',
    POST_RDE_IMPRIMIR_RETIRO = 'RDE_ImprimirReporteRetiroDineroEstacion',


    /**Routes Home Page */
    GET_OBTENER_OPCIONES_MENUS = 'ObtenerOpcionesMenus',
    POST_OBTENER_FONDO_ASIGNADO_ESTACION = 'ADE_ObtenerFondoAsignadoUsuarioEstacion',

    /**Aperturar Cajon */
    POS_APERTURAR_CAJON = 'ACE_AbrirCajaEstacionServicioAPIAperturaCaja',

    /**CajaChica */
    POS_OBTENER_VALOR_CAJA_CHICA = 'ObtenerValorCajaChica',

    /**Transferencia de ventas */
    POST_VALIDA_TRANSFERENCIA_VENTAS = 'TFV_ValidaAplicaTransferencia'
}