import matplotlib.pyplot as plt
import numpy as np
import data

labels = ["aspnetcore","express","flask","phoenix","spring"]

# Random test data
elapsed_data = list(map(lambda name: data.get_elapsed_data(f"{name}_2.csv"),labels))
latency_data = list(map(lambda name: data.get_latency_data(f"{name}_2.csv"),labels))

fig,(ax1,ax2) = plt.subplots(nrows=1, ncols=2)

fig.set_figwidth(10)
fig.set_figheight(10)

# rectangular box plot
bplot1 = ax1.boxplot(elapsed_data,
                     vert=True,  # vertical box alignment
                     patch_artist=True,  # fill with color
                     labels=labels)  # will be used to label x-ticks
ax1.set_title('Porabljen čas (angl. elapsed)')

# rectangular box plot
bplot2 = ax2.boxplot(latency_data,
                     vert=True,  # vertical box alignment
                     patch_artist=True,  # fill with color
                     labels=labels)  # will be used to label x-ticks
ax2.set_title('Zakasnitev (angl. latency)')


# adding horizontal grid lines
ax1.set_xlabel("")
ax1.set_ylabel("Elapsed")
ax2.set_xlabel("")
ax2.set_ylabel("Latency")

#plt.savefig("test.png",dpi=1000,format="png")
plt.show()