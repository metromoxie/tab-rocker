.PHONY: all
all: release

release:
	mkdir release

.PHONY: clean
clean:
	rm -rf release
