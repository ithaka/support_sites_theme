#!/usr/bin/env ruby
require 'json'
require 'rbconfig'

begin
  require 'sassc'
rescue LoadError
  if ENV['SUPPORT_SITES_THEME_RBENV_REEXEC'] != '1'
    rbenv = `command -v rbenv 2>/dev/null`.strip
    unless rbenv.empty?
      exec(
        {
          'SUPPORT_SITES_THEME_RBENV_REEXEC' => '1',
          'PATH' => "#{File.expand_path('~/.rbenv/shims')}:#{File.expand_path('~/.rbenv/bin')}:#{ENV['PATH']}",
        },
        rbenv,
        'exec',
        'ruby',
        __FILE__,
        *ARGV
      )
    end
  end
  raise
end

require_relative 'stylesheet_compiler'

base_dir = File.join(File.dirname(__FILE__), "..")

manifest = File.read(File.join(base_dir, "manifest.json"))
styles_dir = File.join(base_dir, "styles")
styles_path = File.join(styles_dir, "index.scss")
styles = File.read(styles_path)

manifest = JSON.parse(manifest)

scss_variables = manifest["settings"].flat_map { |setting_group| setting_group["variables"] }.map { |variable| variable["identifier"] }

assets = Dir.glob(File.join(base_dir, 'assets', '*.*'))
asset_variables = assets.map { |asset| File.join('assets', File.basename(asset)).gsub(/[^a-z0-9\-_]+/, '-') }
scss_variables.concat(asset_variables)

compiler = StylesheetCompiler.new([styles_dir], scss_variables)
result = compiler.compile(styles)

result_path = File.join(base_dir, "style.css")
File.open(result_path, 'w+') {|f| f.write(result) }

puts "Done :)! Created /style.css file"
