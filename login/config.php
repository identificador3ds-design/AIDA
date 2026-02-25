<?php
$host = 'localhost';
$user = 'root';
$pass = ''; // Senha padrão do XAMPP é vazia
$db   = 'aida';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
?>