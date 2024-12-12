type MetadataInput = Partial<Pick<App.Package, 'status' | 'rune'>> &
	Omit<App.Package, 'id' | 'status' | 'rune'>;

export function definePackageMetadata(metadata: MetadataInput): Omit<App.Package, 'id'> {
	return {
		status: 'stable',
		releaseTag: 'latest',
		rune: true,
		...metadata,
	};
}
