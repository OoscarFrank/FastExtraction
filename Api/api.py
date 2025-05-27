from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app, resources={
    r"/data*": {
        "origins": ["*"],  # Autoriser toutes les origines
        "methods": ["GET", "POST", "OPTIONS"],  # Autoriser ces méthodes
        "allow_headers": ["Content-Type"]
    }
})

data_store = []
current_id = 0  # Index global pour attribuer des IDs uniques

@app.route('/data', methods=['GET'])
def get_data():
    """
    Route GET : renvoie toutes les données avec uniquement 'summary' et 'keywords'.
    """
    return jsonify(data_store[::-1]), 200  # liste inversée

@app.route('/data/<int:item_id>', methods=['GET'])
def get_data_detail(item_id):
    """
    Route GET avec un ID : renvoie les détails pour l'entrée spécifiée.
    """
    for item in data_store:
        if item["id"] == item_id:
            return jsonify(item), 200
    return jsonify({"error": "ID introuvable"}), 404

@app.route('/data', methods=['POST'])
def post_data():
    """
    Route POST : reçoit du JSON brut et l'ajoute au data_store
    Version corrigée avec gestion d'erreur améliorée
    """
    global current_id
    
    # Vérification du Content-Type
    if not request.is_json:
        return jsonify({"error": "Le contenu doit être au format JSON"}), 415
    
    try:
        data = request.get_json(force=True)  # Force le parsing même sans header
        
        # Validation des données
        if not data or 'summary' not in data or 'keywords' not in data:
            return jsonify({
                "error": "Structure JSON invalide",
                "requis": {
                    "summary": "string",
                    "keywords": ["array", "of", "strings"]
                }
            }), 400

        # Traitement des données
        new_entry = {
            "id": current_id,
            "summary": data["summary"],
            "keywords": data["keywords"],
            "timestamp": datetime.datetime.now().isoformat()  # Bonus: ajout d'un timestamp
        }
        
        data_store.append(new_entry)
        current_id += 1
        
        # Réponse détaillée
        return jsonify({
            "status": "success",
            "id": new_entry["id"],
            "created_at": new_entry["timestamp"]
        }), 201

    except Exception as e:
        return jsonify({
            "error": "Erreur de traitement",
            "details": str(e)
        }), 500
        
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=4000)
