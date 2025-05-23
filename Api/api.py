from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Activer CORS pour toutes les routes

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
    Route POST : ajoute de nouvelles données dans le data_store.
    """
    global current_id
    data = request.get_json()

    if not all(key in data for key in ['summary', 'keywords']):
        return jsonify({"error": "Les champs 'summary' et 'keywords' sont obligatoires."}), 400

    # Conserver uniquement 'summary' et 'keywords' et attribuer un ID
    filtered_data = {
        "id": current_id,
        "summary": data["summary"],
        "keywords": data["keywords"]
    }

    data_store.append(filtered_data)
    current_id += 1  # Incrémenter l'ID pour la prochaine entrée
    return jsonify({"message": "Données ajoutées avec succès.", "data": filtered_data}), 201

if __name__ == '__main__':
    app.run(debug=True)
