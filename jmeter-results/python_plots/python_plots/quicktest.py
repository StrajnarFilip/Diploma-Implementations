from data import get_elapsed_data
import statistics

labels = ["aspnetcore","express","flask","phoenix","spring"]
for label in labels:
    data=get_elapsed_data(f"{label}_2.csv")
    print(f"med {label}: {statistics.median(data)}")
    print(f"avg {label}: {statistics.mean(data)}")
    print(f"min {label}: {min(data)}")
    print(f"max {label}: {max(data)}")