import singleplot
import multiplot

labels = ["aspnetcore","express","flask","phoenix","spring"]

multiplot.box_plots_log(labels)

for label in labels:
    #singleplot.single_box_plot(label)
    #singleplot.single_violin_plot(label)
    #singleplot.single_box_plot_log(label)
    pass