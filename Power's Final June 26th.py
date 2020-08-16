import numpy as np
import ahkab
from ahkab import circuit, printing, time_functions
LANG="en_US.UTF-8"

# Concatinate The Strings n + Number Of Node To Pass To The Function
def concat(x):
    return "n" + str(x)

# convert The Strings to int
def sconverti(x):
    return float(x)

# Gives Us Rectangular form
def phase(x, y):
    return np.complex(x * np.math.cos(y * np.math.pi / 180), x * np.math.sin(y * np.math.pi / 180))


list_names_R = []
list_nodes_R = []
list_values_R = []

list_names_C = []
list_nodes_C = []
list_values_C = []

list_names_L = []
list_nodes_L = []
list_values_L = []

list_names_V = []
list_nodes_V = []
list_values_V = []

list_names_I = []
list_nodes_I = []
list_values_I = []

list_names_E = []
list_nodes_E = []
list_values_E = []

list_names_H = []
list_nodes_H = []
list_values_H = []

list_names_F = []
list_nodes_F = []
list_values_F = []

list_names_G = []
list_nodes_G = []
list_values_G = []

x = input("Enter Your File 📂 Name 😀:")
circ = circuit.Circuit(title="Mostafa's  circuit")
File = open(x + '.txt')
freq = sconverti(File.readline())

for i in File:
    row = File.readline()
    L = row.split()
    # Independent Current Source
    if L[0][0] == "I":
        list_names_I.append(L[0])
        list_nodes_I.append((L[1],L[2]))
        #list_values_I.append(phase(L[4], L[3]))
        if L[1] == "0":
            circ.add_isource(L[0], circ.gnd, concat(L[2]), 0, phase(sconverti(L[3]), sconverti(L[4])))
            continue
        if L[2] == "0":
            circ.add_isource(L[0], concat(L[1]), circ.gnd, 0, phase(sconverti(L[3]), sconverti(L[4])))
            continue

        circ.add_isource(L[0], concat(L[1]), concat(L[2]), 0, phase(sconverti(L[3]), sconverti(L[4])))

    # Independent Voltage Source
    if L[0][0] == "V":
        list_names_V.append(L[0])
        list_nodes_V.append((L[1],L[2]))
        #list_values_V.append(phase(L[4], L[3]))
        if L[1] == "0":
            circ.add_vsource(L[0], circ.gnd, concat(L[2]), 0, phase(sconverti(L[3]), sconverti(L[4])))
            continue
        if L[2] == "0":
            circ.add_vsource(L[0], concat(L[1]), circ.gnd, 0, phase(sconverti(L[3]), sconverti(L[4])))
            continue

        circ.add_vsource(L[0], concat(L[1]), concat(L[2]), 0, phase(sconverti(L[3]), sconverti(L[4])))
    # Passive elements
    if L[0][0] == "L":
        list_names_L.append(L[0])
        list_nodes_L.append((L[1],L[2]))
        list_values_L.append(L[3])
        if L[1] == "0":
            circ.add_inductor(L[0], circ.gnd, concat(L[2]), sconverti(L[3]))
            continue
        if L[2] == "0":
            circ.add_inductor(L[0], concat(L[1]), circ.gnd, sconverti(L[3]))
            continue

        circ.add_inductor(L[0], concat(L[1]), concat(L[2]), sconverti(L[3]))
        #Capacitor
    if L[0][0] == "C":
        list_names_C.append(L[0])
        list_nodes_C.append((L[1],L[2]))
        list_values_C.append(L[3])
        if L[1] == "0":
            circ.add_capacitor(L[0], circ.gnd, concat(L[2]), sconverti(L[3]))
            continue

        if L[2] == "0":
            circ.add_capacitor(L[0], concat(L[1]), circ.gnd, sconverti(L[3]))
            continue

        circ.add_capacitor(L[0], concat(L[1]), concat(L[2]), sconverti(L[3]))
        #Resistor
    if L[0][0] == "R":
        list_names_R.append(L[0])
        list_nodes_R.append((L[1],L[2]))
        list_values_R.append(L[3])
        if L[1] == "0":
            circ.add_resistor(L[0], circ.gnd, concat(L[2]), sconverti(L[3]))
            continue
        if L[2] == "0":
            circ.add_resistor(L[0], concat(L[1]), circ.gnd, sconverti(L[3]))
            continue
        circ.add_resistor(L[0], concat(L[1]), concat(L[2]), sconverti(L[3]) * e3)

    # Voltage Controlled Voltage Source
    if (L[0][0]) == "E":
        list_names_E.append(L[0])
        list_nodes_E.append((L[1],L[2]))
        list_values_E.append(L[5])
        if L[1] == "0":
            if L[3]=="0":
                circ.add_vcvs(L[0], circ.gnd, concat(L[2]),  circ.gnd,concat(L[4]), sconverti(L[5]))
                continue
            if L[4]=="0":
                circ.add_vcvs(L[0], circ.gnd, concat(L[2]), concat(L[3]), circ.gnd, sconverti(L[5]))
                continue
            circ.add_vcvs(L[0], circ.gnd, concat(L[2]), concat(L[3]), circ.gnd, sconverti(L[5]))
            continue
        if L[2] == "0":
            if L[3]=="0":
                circ.add_vcvs(L[0], circ.gnd, concat(L[2]),  circ.gnd,concat(L[4]), sconverti(L[5]))
                continue
            if L[4]=="0":
                circ.add_vcvs(L[0], circ.gnd, concat(L[2]), concat(L[3]), circ.gnd, sconverti(L[5]))
                continue
            circ.add_vcvs(L[0], concat(L[1]), circ.gnd, concat(L[3]), circ.gnd, sconverti(L[5]))
            continue
        circ.add_vcvs(L[0], concat(L[1]), concat(L[2]), concat(L[3]), concat(L[4]), sconverti(L[5]))

    # Voltage Controlled Current Source
    if (L[0][0]) == "G":
        list_names_G.append(L[0])
        list_nodes_G.append((L[1],L[2]))
        list_values_G.append(L[5])
        if L[1] == "0":
            if L[3]=="0":
                circ.add_vccs(L[0], circ.gnd, concat(L[2]),  circ.gnd,concat(L[4]), sconverti(L[5]))
                continue
            if L[4]=="0":
                circ.add_vccs(L[0], circ.gnd, concat(L[2]), concat(L[3]), circ.gnd, sconverti(L[5]))
                continue
            circ.add_vccs(L[0], circ.gnd, concat(L[2]), concat(L[3]), circ.gnd, sconverti(L[5]))
            continue
        if L[2] == "0":
            if L[3]=="0":
                circ.add_vccs(L[0], circ.gnd, concat(L[2]),  circ.gnd,concat(L[4]), sconverti(L[5]))
                continue
            if L[4]=="0":
                circ.add_vccs(L[0], circ.gnd, concat(L[2]), concat(L[3]), circ.gnd, sconverti(L[5]))
                continue
            circ.add_vccs(L[0], concat(L[1]), circ.gnd, concat(L[3]), circ.gnd, sconverti(L[5]))
            continue
        circ.add_vccs(L[0], concat(L[1]), concat(L[2]), concat(L[3]), concat(L[4]), sconverti(L[5]))

    # current Controlled Current Source
    if (L[0][0]) == "F":
        list_names_F.append(L[0])
        list_nodes_F.append((L[1],L[2]))
        list_values_F.append(L[4])
        if L[1] == "0":
            circ.add_cccs(L[0], circ.gnd, concat(L[2]),L[3],sconverti(L[4]) )
            continue
        if L[2] == "0":
            circ.add_cccs(L[0], concat(L[1]), circ.gnd, L[3],sconverti(L[4]))
            continue
        circ.add_cccs(L[0], concat(L[1]), concat(L[2]),L[3],sconverti(L[4]))

    # Current Controlled Voltage Source
    if (L[0][0]) == "H":
        list_names_H.append(L[0])
        list_nodes_H.append((L[1],L[2]))
        list_values_H.append(L[4])
        if L[1] == "0":
            circ.add_cccs(L[0], circ.gnd, concat(L[2]),L[3],sconverti(L[4]) )
            continue
        if L[2] == "0":
            circ.add_cccs(L[0], concat(L[1]), circ.gnd, L[3],sconverti(L[4]))
            continue

        circ.add_cccs(L[0], concat(L[1]), concat(L[2]),L[3],sconverti(L[4]))


ac = ahkab.new_ac(start=freq, stop=freq, points=2, x0=None)

r = ahkab.run(circ, ac)

for i in r['ac']:
    print(i[0] + "= ", i[1][1])

File.close()


output = open("output of powers", "w")
# The active resistor power values
RPS = 0
for i, node in enumerate(List_nodes_R):
    v1 = 0
    v2 = 0
    if node[0] != '0':
        v1 = r['ac']['v'+node[0]][0]
    if node[1] != '0':
        v2 = r['ac']['v'+node[1]][0]
    v=v2-v1
    pw = round((np.power(v, 2)) / (2 * abs(list_values_R[i])), 10)
    RPS += pw
    output.write("The Power consumed by the resistor "+list_names_R[i]+" is "+str(p)+"\n")
    
    # The reactive capacitor power values

CPS = 0
for i, node in enumerate(List_nodes_C):
    v1=0
    v2=0
    if node[0] != '0':
        v1 = r['ac']['v'+node[0]][0]
    if node[1] != '0':
        v2 = r['ac']['v'+node[1]][0]
    v = v2-v1
    pw = round((np.power(v, 2)) / (2 * abs(list_values_C[i])), 10)
    CPS += pw
    output.write("The reactive power of the capacitor "+list_names_C[i]+" is "+str(p)+"\n")
    
     # The reactive inductor power values

LPS = 0
for i, node in enumerate(List_nodes_L):
    v1 = 0
    v2 = 0
    if node[0] != '0':
        v1 = r['ac']['v'+node[0]][0]
    if node[1] != '0':
        v2 = r['ac']['v'+node[1]][0]
    v = v2-v1
    pw = round((np.power(v, 2)) / (2 * abs(list_values_L[i])), 10)
    LPS += pw
    output.write("The reactive power of the inductor "+list_names_L[i]+" is "+str(p)+"\n")
                 
    # Delivered power by the independent voltage sources
 
VPS = 0
for i, node in enumerate(List_nodes_V):
    v1 = 0
    v2 = 0
    if node[0] != '0':
        v1 = r['ac']['v'+node[0]][0]
    if node[1] != '0':
        v2 = r['ac']['v'+node[1]][0]
    v = v2-v1
    pw = round(0.5*v*r['ac']['I'+'('+List_names_V[i]+')'][0], 10)
    VPS += pw
    output.write("The delivered power by the voltage source "+list_names_V[i]+" is "+str(p)+"\n")
                 
     # Delivered power by the independent current sources sources
 
IPS = 0
for i, node in enumerate(List_nodes_I):
    v1 = 0
    v2 = 0
    if node[0] != '0':
        v1 = r['ac']['v'+node[0]][0]
    if node[1] != '0':
        v2 = r['ac']['v'+node[1]][0]
    v = v2-v1
    #pw = round (0.5*v*List_values_I[i],10)
    pw = round (0.5*v*r['ac']['I'+'('+List_names_I[i]+')'][0],10)
    IPS += pw
    output.write("The delivered power by the current source "+list_names_I[i]+" is "+str(p)+"\n")
                 
                 
    # Delivered power by the dependent voltage sources

# VCVS
EPS = 0
for i, node in enumerate(List_nodes_E):
    v1 = 0
    v2 = 0
    if node[0] != '0':
        v1 = r['ac']['v'+node[0]][0]
    if node[1] != '0':
        v2 = r['ac']['v'+node[1]][0]
    v = v2-v1
    pw = round (0.5*v*r['ac']['I'+'('+List_names_E[i]+')'][0], 10)
    EPS += pw
    output.write("The delivered power by the voltage source "+list_names_E[i]+" is "+str(p)+"\n")

# CCVS
HPS = 0
for i, node in enumerate(List_nodes_H):
    v1 = 0
    v2 = 0
    if node[0] != '0':
        v1 = r['ac']['v'+node[0]][0]
    if node[1] != '0':
        v2 = r['ac']['v'+node[1]][0]
    v = v2-v1
    pw = round(0.5*v*r['ac']['I'+'('+List_names_H[i]+')'][0], 10)
    HPS += pw
    output.write("The delivered power by the voltage source "+list_names_H[i]+" is "+str(p)+"\n")
                 
        # Delivered power by the dependent current sources

# VCCS
GPS = 0
for i, node in enumerate(List_nodes_G):
    v1 = 0
    v2 = 0
    if node[0] != '0':
        v1 = r['ac']['v'+node[0]][0]
    if node[1] != '0':
        v2 = r['ac']['v'+node[1]][0]
    v = v2-v1
    pw = round(0.5*v*r['ac']['I'+'('+List_names_G[i]+')'][0], 10)
    GPS += pw
    output.write("The delivered power by the current source "+list_names_G[i]+" is "+str(p)+"\n")

# CCCs
FPS = 0
for i, node in enumerate(List_nodes_F):
    v1 = 0
    v2 = 0
    if node[0] != '0':
        v1 = r['ac']['v'+node[0]][0]
    if node[1] != '0':
        v2 = r['ac']['v'+node[1]][0]
    v = v2-v1
    pw = round(0.5*v*r['ac']['I'+'('+List_names_F[i]+')'][0], 10)
    FPS += pw
    output.write("The delivered power by the current source ", list_names_F[i], " is ", p, "\n")

pwdelivered = VPS+IPS+FPS+GPS+HPS+EPS
pwconsumed = RPS
output.write("PWdelivered = " + str(pwdelivered) + "  PWconsumed = " + str(pwconsumed))
output.write("men gamden now !!!!")
output.close()







