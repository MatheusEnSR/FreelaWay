import axios from 'axios';
import { useContext } from 'react'; // Pode precisar de ajustes para usar fora de componentes
import { AuthContext } from '../context/AuthContext'; // Ajuste o caminho

const baseURL = 'http://127.0.0.1:8000';

const api = axios.create({
    baseURL,
});

api.interceptors.request.use(config => {
    const tokens = localStorage.getItem('authTokens') 
        ? JSON.parse(localStorage.getItem('authTokens')) 
        : null;

    if (tokens) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
});


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // LOG 1: VER SE O INTERCEPTOR ESTÁ CAPTURANDO O ERRO
        console.log('INTERCEPTOR: Erro capturado!', error.response?.status, error.response?.data);

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // LOG 2: VER SE ENTROU NA LÓGICA DE REFRESH
            console.log('INTERCEPTOR: Erro 401 detectado, tentando renovar o token...');

            try {
                const authTokens = JSON.parse(localStorage.getItem('authTokens'));
                
                if (!authTokens?.refresh) {
                    console.error("INTERCEPTOR: Sem refresh token, deslogando.");
                    // Lógica de logout aqui...
                    return Promise.reject(error);
                }

                const response = await axios.post(`${baseURL}/api/token/refresh/`, {
                    refresh: authTokens.refresh,
                });

                // LOG 3: VER SE O REFRESH FUNCIONOU
                console.log('INTERCEPTOR: Token renovado com sucesso!', response.data);

                // ... (resto do código para salvar o token e tentar de novo)

            } catch (refreshError) {
                // LOG 4: ESSA É A PISTA MAIS IMPORTANTE SE O REFRESH FALHAR
                console.error('INTERCEPTOR: FALHA AO TENTAR RENOVAR O TOKEN!', refreshError.response?.data);
                
                // Lógica de logout aqui...
                localStorage.removeItem('authTokens');
                window.location.href = '/login';
                
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;