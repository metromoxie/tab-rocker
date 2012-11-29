RELEASEDIR=release
EXCLUDES=--exclude=".*" --exclude="*.ai" --exclude="$(RELEASEDIR)" --exclude="$(RELEASEDIR).zip"

.PHONY: all
all: $(RELEASEDIR)

$(RELEASEDIR):
	mkdir release
	rsync -a $(EXCLUDES) . $(RELEASEDIR)
	zip -r $(RELEASEDIR) $(RELEASEDIR)

.PHONY: clean
clean:
	rm -rf $(RELEASEDIR) $(RELEASEDIR).zip
