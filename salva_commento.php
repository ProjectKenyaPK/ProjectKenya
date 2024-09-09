<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $commento = filter_input(INPUT_POST, 'commento', FILTER_SANITIZE_STRING);
    
    if (!$nome || !$commento) {
        echo json_encode(['success' => false, 'message' => 'Nome e commento sono richiesti.']);
        exit;
    }

    $data = date('Y-m-d H:i:s');

    $nuovo_commento = [
        'nome' => $nome,
        'commento' => $commento,
        'data' => $data
    ];

    $commento_json = json_encode($nuovo_commento) . "\n";

    $file = 'commenti.txt';
    if (file_put_contents($file, $commento_json, FILE_APPEND | LOCK_EX) === false) {
        echo json_encode(['success' => false, 'message' => 'Errore nel salvataggio del commento.']);
    } else {
        echo json_encode(['success' => true, 'message' => 'Commento salvato con successo.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito.']);
}
?>
