const LoginOverlay = ({ onLogin }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-bee-dark-900 z-50">
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-red-600 dark:text-bee-dark-600">
            ⚠️ Acesso Restrito
          </p>
          <p className="text-lg dark:text-bee-dark-400">
            Para acessar, realize o login!
          </p>

          <button
            onClick={onLogin}
            className="px-6 py-3 bg-bee-purple-600 text-white rounded-lg hover:bg-bee-purple-700 transition"
          >
            Fazer Login
          </button>
        </div>
      </div>
    )
  }

  export default LoginOverlay
