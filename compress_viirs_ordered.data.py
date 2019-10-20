#!/usr/bin/python

import sys

def main():
    modulus = 6
    count = 0
    sum = 0

    for line in  open(sys.argv[1], 'r'):
        sum += int(line.strip().split('.')[0])
        count += 1

        if count%modulus == 0:
            print sum
            sum = 0
            

if __name__ == "__main__":
    main()
