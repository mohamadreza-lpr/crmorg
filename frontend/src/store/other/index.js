export default {
    namespaced: true,
    state: {
        alert: {
            type: undefined,
            message: undefined,
            visibility: false,
        },
        surveyCreateSession: false,
    },
    getters: {
        getSurveySession(state) {
            return state.surveyCreateSession;
        },
        getAlert(state){
            return state.alert
        },
        isAlertValid(state) {
            return state.alert.visibility;
        }
    },
    mutations: {
        setSurveySession(state, session) {
            state.surveyCreateSession = session;
        },
        setAlert(state, alert){
            state.alert = alert;
        },
        setAlertVisibility(state, visibility) {
            state.alert.visibility = false;
        }
    },
    actions: {}
};