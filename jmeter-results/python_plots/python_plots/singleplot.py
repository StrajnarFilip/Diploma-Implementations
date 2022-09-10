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
    
    plt.savefig(f"{framework}_box.png",dpi=1000,format="png")

def single_box_plot_log(framework: str):
    framework_data=data.get_elapsed_data(f"{framework}_2.csv")

    fig,ax=plt.subplots()
    
    fig.set_figwidth(7)
    fig.set_figheight(7)

    bplot1 = ax.boxplot(framework_data,
                     vert=True,  # vertical box alignment
                     patch_artist=True,  # fill with color
                     labels=[framework])  # will be used to label x-ticks
    ax.set_title('Odzivni čas (angl. elapsed) v milisekundah')
    ax.semilogy()
    ax.set_xlabel("Ogrodja")
    ax.set_ylabel("Odzivni čas (ms)")
    
    plt.savefig(f"{framework}_box_log.png",dpi=1000,format="png")

def single_violin_plot(framework: str):
    framework_data=data.get_elapsed_data(f"{framework}_2.csv")

    fig,ax=plt.subplots()

    fig.set_figwidth(8)
    fig.set_figheight(8)

    parts = ax.violinplot(framework_data,
                     vert=True,)  # vertical box alignment

    for pc in parts['bodies']:
        pc.set_edgecolor('blue')
        pc.set_alpha(1)

    ax.set_title('Odzivni čas (angl. elapsed) v milisekundah')

    ax.set_xlabel(f"Ogrodje {framework}")
    ax.set_ylabel("Odzivni čas (ms)")
    ax.set_xticks([],labels=[])
    
    plt.savefig(f"{framework}_violin.png",dpi=1500,format="png")