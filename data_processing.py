import pandas as pd

def load_data(file_path = 'data/player_stats.csv'):
    data = pd.read_csv(file_path)
    data = data.dropna()
    return data

def get_player_stats(data, player_name):
    return data[data['player'] == player_name]
