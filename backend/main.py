from flask import Flask, request, jsonify
from flask_cors import CORS
from data_processing import (
    load_batting_data,
    load_pitching_data,
    get_unique_teams,
    get_players_by_team,
    get_stat_columns,
    get_player_stats_by_name
)

app = Flask(__name__)
CORS(app)

# Load and preprocess data
batting_data = load_batting_data()
pitching_data = load_pitching_data()

@app.route('/teams', methods=['GET'])
def get_teams():
    return jsonify(sorted(list(set(get_unique_teams(batting_data) + get_unique_teams(pitching_data)))))

@app.route('/players', methods=['GET'])
def get_players():
    team = request.args.get('team')
    data_type = request.args.get('type', 'batting')  # 'batting' or 'pitching'
    data = batting_data if data_type == 'batting' else pitching_data
    players = get_players_by_team(data, team)
    return jsonify(players)

@app.route('/stat-options', methods=['GET'])
def stat_options():
    data_type = request.args.get('type', 'batting')
    data = batting_data if data_type == 'batting' else pitching_data
    return jsonify(get_stat_columns(data))

@app.route('/compare_players', methods=['GET'])
def compare_players():
    player1 = request.args.get('player1')
    player2 = request.args.get('player2')
    stat_keys = request.args.getlist('stats')  # multiple stats
    data_type = request.args.get('type', 'batting')
    data = batting_data if data_type == 'batting' else pitching_data

    stats1 = get_player_stats_by_name(data, player1, stat_keys)
    stats2 = get_player_stats_by_name(data, player2, stat_keys)

    return jsonify({
        'player1': stats1,
        'player2': stats2
    })

if __name__ == '__main__':
    app.run(debug=True)

