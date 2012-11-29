RELEASEDIR=release
EXCLUDES=--exclude=".*" --exclude="*.ai" --exclude="$(RELEASEDIR)"

.PHONY: all
all: $(RELEASEDIR)

$(RELEASEDIR):
	mkdir release
	rsync -a $(EXCLUDES) . release

.PHONY: clean
clean:
	rm -rf release
