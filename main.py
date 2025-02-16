from flask import Flask, request, render_template, jsonify
from data_processing import load_data, get_player_stats

app = Flask(__name__)
data = load_data()


def compare_players():
    player1 = request.args.get('player1')
    player2 = request.args.get('player2')

    stats1 = get_player_stats(data, player1).to_dict(orient = 'records')
    stats2 = get_player_stats(data, player2).to_dict(orient = 'records')

    return jsonify({'player1': stats1, 'player2': stats2})


if __name__ == '__main__':
    app.run(debug=True)
