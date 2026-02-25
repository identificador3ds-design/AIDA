<?php
session_start(); // Inicia a sessão para manter o usuário logado
include('config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // 1. PREPARE: Busca o usuário pelo email
    $sql = "SELECT id, nome, senha FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        // 2. VERIFY: Compara a senha digitada com o hash do banco
        if (password_verify($senha, $user['senha'])) {
            // Salva dados na sessão
            $_SESSION['usuario_id'] = $user['id'];
            $_SESSION['usuario_nome'] = $user['nome'];

            // 3. REDIRECT: Aqui você colocará o nome da sua página HTML
            // Por enquanto, usaremos 'dashboard.html' como exemplo
            header("Location: dashboard.html");
            exit();
        } else {
            echo "<script>alert('Senha incorreta!'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('Usuário não encontrado!'); window.history.back();</script>";
    }
    
    $stmt->close();
}
$conn->close();
?>