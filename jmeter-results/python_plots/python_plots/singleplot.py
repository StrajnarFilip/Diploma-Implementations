import matplotlib.pyplot as plt
import numpy as np
import data

def single_box_plot(framework: str):
    framework_data=data.get_elapsed_data(f"{framework}_2.csv")

    fig,ax=plt.subplots()
    
    fig.set_figwidth(7)
    fig.set_figheight(7)

    bplot1 = ax.boxplot(framework_data,
                     vert=True,  # vertical box alignment
                     patch_artist=True,  # fill with color
                     labels=[framework])  # will be used to label x-ticks
    ax.set_title('Odzivni čas (angl. elapsed) v milisekundah')

    ax.set_xlabel("Ogrodja")
    ax.set_ylabel("Odzivni čas (ms)")
    
    plt.savefig(f"{framework}.png",dpi=1000,format="png")