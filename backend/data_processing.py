import pandas as pd
import os

# Set file paths
batting_path = os.path.join(os.path.dirname(__file__), 'data', '2023 MLB Player Stats - Batting.csv')
pitching_path = os.path.join(os.path.dirname(__file__), 'data', '2023 MLB Player Stats - Pitching.csv')

def load_batting_data():
    return pd.read_csv(batting_path, encoding='ISO-8859-1', sep=';')

def load_pitching_data():
    return pd.read_csv(pitching_path, encoding='ISO-8859-1', sep=';')

def get_unique_teams(data):
    return data['Tm'].dropna().unique().tolist()

def get_players_by_team(data, team):
    return data[data['Tm'] == team]['Name'].dropna().unique().tolist()

def get_stat_columns(data):
    return [col for col in data.columns if col not in ['Rk', 'Name', 'Age', 'Tm', 'Lg']]

def get_player_stats_by_name(data, player_name, stat_keys):
    filtered = data[data['Name'].str.lower() == player_name.lower()]
    if filtered.empty:
        return {}
    player = filtered.iloc[0]
    # Convert each value to a JSON-serializable type
    return {
        key: (float(player[key]) if pd.notna(player[key]) and isinstance(player[key], (int, float)) else str(player[key]))
        for key in stat_keys
    }

