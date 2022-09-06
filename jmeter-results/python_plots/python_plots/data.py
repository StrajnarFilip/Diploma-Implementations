import csv

def get_elapsed_data(csv_name: str):
    with open(csv_name) as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
        return list(map(lambda row: int(row[1]),list(spamreader)[1:]))

def get_latency_data(csv_name: str):
    with open(csv_name) as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
        return list(map(lambda row: int(row[14]),list(spamreader)[1:]))
