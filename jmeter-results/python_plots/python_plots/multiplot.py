import matplotlib.pyplot as plt
import numpy as np
import data

def box_plots(labels: list[str]):
    elapsed_data = list(map(lambda name: data.get_elapsed_data(f"{name}_2.csv"),labels))

    fig,ax=plt.subplots()

    bplot1 = ax.boxplot(elapsed_data,
                     vert=True,  # vertical box alignment
                     patch_artist=True,  # fill with color
                     labels=labels)  # will be used to label x-ticks
    ax.set_title('Odzivni čas (angl. elapsed) v milisekundah')
    ax.set_xlabel("Ogrodja")
    ax.set_ylabel("Odzivni čas (ms)")
    plt.savefig(f"all_frameworks_box.png",dpi=1000,format="png")

def box_plots_log(labels: list[str]):
    elapsed_data = list(map(lambda name: data.get_elapsed_data(f"{name}_2.csv"),labels))

    fig,ax=plt.subplots()

    bplot1 = ax.boxplot(elapsed_data,
                     vert=True,  # vertical box alignment
                     patch_artist=True,  # fill with color
                     labels=labels)  # will be used to label x-ticks
    ax.set_title('Odzivni čas (angl. elapsed) v milisekundah')
    ax.set_xlabel("Ogrodja")
    ax.set_ylabel("Odzivni čas (ms)")
    ax.semilogy()
    plt.savefig(f"all_frameworks_box_log.png",dpi=1000,format="png")


def elapsed_and_latency(labels: list[str],image_name: str):
    

    elapsed_data = list(map(lambda name: data.get_elapsed_data(f"{name}_2.csv"),labels))
    latency_data = list(map(lambda name: data.get_latency_data(f"{name}_2.csv"),labels))

    fig,(ax1,ax2) = plt.subplots(nrows=1, ncols=2)

    fig.set_figwidth(14)
    fig.set_figheight(10)

    # rectangular box plot
    bplot1 = ax1.boxplot(elapsed_data,
                        vert=True,  # vertical box alignment
                        patch_artist=True,  # fill with color
                        labels=labels)  # will be used to label x-ticks
    ax1.set_title('Odzivni čas (angl. elapsed) v milisekundah')

    # rectangular box plot
    bplot2 = ax2.boxplot(latency_data,
                        vert=True,  # vertical box alignment
                        patch_artist=True,  # fill with color
                        labels=labels)  # will be used to label x-ticks
    ax2.set_title('Zakasnitev (angl. latency) v milisekundah')


    # adding horizontal grid lines
    ax1.set_xlabel("Ogrodja")
    ax1.set_ylabel("Odzivni čas (ms)")
    ax2.set_xlabel("Ogrodja")
    ax2.set_ylabel("Zakasnitev (ms)")

    plt.savefig(f"{image_name}.png",dpi=1000,format="png")
    #plt.show()